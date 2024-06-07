export type goalResult = {
  kcal: number;
  fats: number;
  carbs: number;
  proteins: number;
};

export type scanResult = {
  data: {
    id: string;
    distributor: {
      names: string;
      manufacturingPlaces: string;
    };
    ingredient: {
      names: string;
      text: string;
    };
    macroNutrient: {
      carbohydrates: Number;
      energyKcal: Number;
      energyKJ: Number;
      fat: Number;
      proteins: Number;
      salt: Number;
      saturatedFats: Number;
      sugars: Number;
    };
    microNutrient: {
      vitamins: string;
      minerals: string;
    };
    image: {
      imageData: string;
      imageType: string;
    };
    name: string;
    brandName: string;
    barcode: string;
    weightValue: Number;
    weightType: string;
    expiresAt: string;
  };
};
