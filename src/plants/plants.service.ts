import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantsRepository } from './plants.repository';
import { Plants } from './plants.entity';
import { getPlantsListApi, getPlantsDetailtApi } from 'src/api/plants';
import * as xml2js from 'xml2js';
import { plantsDetailDatoToDb, plantsListDataToDb } from 'src/utils/dataToDb';
import { Like } from 'typeorm';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(PlantsRepository)
    private plantsRepository: PlantsRepository,
  ) {}

  async getPlantsList(query): Promise<Plants[]> {
    try {
      const { page = 1, pageSize = 10, sort = 'createAt' } = query;
      let order: string;
      switch (sort) {
        case 'name':
          order = 'ASC';
          break;
        case 'view_count':
          order = 'DESC';
          break;
        case 'createdAt':
          order = 'DESC';
          break;
        default:
          break;
      }
      const result = await this.plantsRepository.find({
        order: {
          [sort]: order,
          id: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          imageUrl: true,
          thumbImageUrl: true,
          view_count: true,
          createdAt: true,
          functionality_info: true,
        },
      });
      return result;
    } catch (error) {
      throw new NotFoundException(`Can't find`);
    }
  }

  async getPlantsById(id: number): Promise<Plants> {
    const result = await this.plantsRepository.findOneBy({ id });

    if (!result) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return result;
  }

  async getPlantsListBySearch(query): Promise<Plants[]> {
    try {
      const result = await this.plantsRepository.find({
        skip: 0,
        where: { name: Like(`%${query.name}%`) },
        take: 10,
        select: {
          id: true,
          name: true,
          imageUrl: true,
          thumbImageUrl: true,
          view_count: true,
          createdAt: true,
          functionality_info: true,
        },
      });
      return result;
    } catch (error) {
      throw new NotFoundException(`Can't find`);
    }
  }

  async createPlants(): Promise<any> {
    // const data = getPlantsAPI();
    const dataToEntity = {
      name: 'dd',
    };

    const plants = this.plantsRepository.create({
      name: dataToEntity.name,
    });

    await this.plantsRepository.save(plants);

    return plants;
  }

  async getPlantsData() {
    // 식물 api 가져오기
    // page 기본값 1, 페이지당 50개씩 가져옴 가나다 순이라 띄엄띄엄 적고 안될때도 있음 값 에러인듯
    const plantsListXmlData = await getPlantsListApi(1);

    let plantsListJsonData;
    xml2js.parseString(plantsListXmlData, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        plantsListJsonData = result;
      }
    });

    // db 저장하는 함수
    const plantsListData = await Promise.all(
      plantsListDataToDb(
        plantsListJsonData.response?.body[0]?.items[0].item,
      ).map(async (data) => {
        const plantsDetailXmlData = await getPlantsDetailtApi(data.plantsNo);

        let plantsDetailJsonData;
        xml2js.parseString(plantsDetailXmlData, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            plantsDetailJsonData = result;
          }
        });

        const detailData = plantsDetailDatoToDb(
          plantsDetailJsonData.response.body[0].item[0],
        );
        const context = { ...data, ...detailData };
        const found = await this.plantsRepository.findOneBy({
          plantsNo: context.plantsNo,
        });
        // 있으면 저장은 안함.
        if (found) return context;
        const plants = this.plantsRepository.create({
          ...context,
          view_count: 0,
        });

        await this.plantsRepository.save(plants);

        return context;
      }),
    );

    return plantsListData;
  }
}
