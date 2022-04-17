import { useEffect, useState } from "react";
import { rowObject } from "../helpers/interfaces";
import { handlingEvents } from "../helpers/services";

function HomePage() {
  // states
  const [rowInfo, setRowInfo] = useState<Array<rowObject>>([]);
  let [id, setId] = useState<number>(0);
  const [rowsSum, setRowsSum] = useState<number>(0);

  // functions
  const handleAddingRows = () => {
    setId(++id);
    setRowInfo([...rowInfo, handlingEvents.handleAddingRowsService(id)]);
  };

  const handleDeletingRows = (id: any) => {
    setRowInfo([...handlingEvents.handleDeletingRowsService(rowInfo, id)]);
  };

  const handleChangeNumber = (id: number, value: number) => {
    setRowInfo([
      ...handlingEvents.handleChangeNumberService(rowInfo, id, value),
    ]);
  };

  const handleDisableEnable = (id: number) => {
    setRowInfo([...handlingEvents.handleDisableEnableService(rowInfo, id)]);
  };

  const handleMinusPlus = (id: number, value: string) => {
    setRowInfo([...handlingEvents.handleMinusPlusService(rowInfo, id, value)]);
  };

  useEffect(() => {
    setRowsSum(handlingEvents.handleRowsSum(rowInfo));
  }, [rowInfo]);

  return (
    <div className="App">
      <input type="submit" value="add row" onClick={handleAddingRows}></input>

      <ul>
        {rowInfo?.map((e) => {
          return (
            <li key={e.id}>
              <select
                defaultValue="+"
                id={`${e.id}`}
                disabled={e.disabled || e.number === 0}
                onChange={(e) => {
                  const id = parseInt(
                    (e.target as unknown as HTMLTextAreaElement).id
                  );
                  const value = (e.target as unknown as HTMLTextAreaElement)
                    .value;
                  handleMinusPlus(id, value);
                }}
              >
                <option
                  value="+"
                  selected={e.minusOrPlus === "positive" && true}
                >
                  +
                </option>
                <option
                  value="-"
                  selected={e.minusOrPlus === "negative" && true}
                >
                  -
                </option>
              </select>

              <input
                id={`${e.id}`}
                type="number"
                onChange={(e) => {
                  const id = parseInt(
                    (e.target as unknown as HTMLTextAreaElement).id
                  );
                  const value = parseInt(
                    (e.target as unknown as HTMLTextAreaElement).value
                  );
                  handleChangeNumber(id, value);
                }}
                disabled={e.disabled}
                value={e.number}
              ></input>

              <input
                id={`${e.id}`}
                type="submit"
                value="delete"
                onClick={(e) => {
                  const id = parseInt((e.target as HTMLTextAreaElement).id);
                  handleDeletingRows(id);
                }}
                disabled={e.disabled}
              ></input>

              <input
                type="submit"
                value={e.disabled ? "enable" : "disable"}
                onClick={() => {
                  handleDisableEnable(e.id);
                }}
              ></input>
            </li>
          );
        })}
      </ul>
      <span>Result: {rowsSum}</span>
    </div>
  );
}

export default HomePage;
