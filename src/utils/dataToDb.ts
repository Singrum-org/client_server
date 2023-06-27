export const plantsListDataToDb = (items) => {
  const tranData = items.map((item) => {
    const context = {};

    context['plantsNo'] = item.cntntsNo[0];
    context['name'] = item.cntntsSj[0];
    context['imageUrl'] = item.rtnFileUrl[0].split('|')[0];
    context['thumbImageUrl'] = item.rtnThumbFileUrl[0].split('|')[0];
    return context;
  });
  return tranData;
};

export const plantsDetailDatoToDb = (item) => {
  const context = {};

  context['variety'] = item.fmlNm[0];
  context['origin'] = item.orgplceInfo[0];
  context['height'] = item.growthHgInfo[0];
  context['area'] = item.growthAraInfo[0];
  context['leaf'] = item.lefmrkCodeNm[0];
  context['smell'] = item.smellCodeNm[0];
  context['growth_temperature'] = item.grwhTpCodeNm[0];
  context['functionality_info'] = item.fncltyInfo[0];
  context['humidity'] = item.hdCodeNm[0];
  context['growth_rate'] = item.grwtveCodeNm[0];
  context['breeding_season'] = item.prpgtEraInfo[0];

  return context;
};
