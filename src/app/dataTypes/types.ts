export type goalResultType = {
  totalKCal: number;
  fats: number;
  carbohydrates: number;
  proteins: number;
};

export type mealType = {
  name: string;
  totalKCal: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
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
      carbohydrates: number;
      energyKcal: number;
      energyKJ: number;
      fat: number;
      proteins: number;
      salt: number;
      saturatedFats: number;
      sugars: number;
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
