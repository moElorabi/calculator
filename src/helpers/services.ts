import { rowObject } from "./interfaces";

export class handlingEvents {
  static handleAddingRowsService(id: any): rowObject {
    const newRow = {
      id: id,
      number: 0,
      disabled: false,
      minusOrPlus: "positive",
    };

    return newRow;
  }

  static handleDeletingRowsService(rowInfo: rowObject[], id: any): rowObject[] {
    const newRow = rowInfo.filter((row: { id: any }) => row.id !== id);
    return newRow;
  }

  static handleChangeNumberService(
    rowInfo: rowObject[],
    id: number,
    value: number
  ): rowObject[] {
    const newRow = rowInfo.map((item) => {
      return item.id === id
        ? {
            ...item,
            number: value,
            minusOrPlus: `${value < 0 ? "negative" : "positive"}`,
          }
        : item;
    });
    return newRow;
  }

  static handleDisableEnableService(
    rowInfo: rowObject[],
    id: number
  ): rowObject[] {
    const newRow = rowInfo.map((i) => {
      return i.id === id ? { ...i, disabled: !i.disabled } : i;
    });
    return newRow;
  }

  static handleMinusPlusService(
    rowInfo: rowObject[],
    id: number,
    value: string
  ): rowObject[] {
    const newRow = rowInfo.map((i) => {
      return i.id === id
        ? {
            ...i,
            number: parseInt(
              `${value === "-" ? -Math.abs(i.number) : Math.abs(i.number)}`
            ),
          }
        : i;
    });
    return newRow;
  }

  static handleRowsSum(rowInfo: rowObject[]): number {
    const arrOfNumbersToSum = rowInfo.map((e) => {
      return !e.disabled ? e.number : 0;
    });
    const reducedArr = arrOfNumbersToSum.reduce((a, b) => a + b, 0);
    return reducedArr;
  }
}
