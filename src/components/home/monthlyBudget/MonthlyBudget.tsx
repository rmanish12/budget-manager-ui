import React, { useEffect } from "react";
import moment from "moment";
import { Paper } from "@material-ui/core";

import "../../App.css";

const MonthlyBudget = () => {

  const monthlyBudget = {
    income: 0,
    expense: 0,
    total: 0,
  }

  const { income, expense, total } = monthlyBudget;

  return (
    <>
      <div>
        <Paper>
          <div className="budget-month-info-div">
            <span className="budget-month-info-span">
              Budget for current month:{" "}
              {moment(new Date()).format("MMMM, YYYY")}
            </span>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="monthly-budget-keys">Available:</td>
                  <td
                    className={
                      total > 0
                        ? "monthly-budget-keys monthly-budget-income-text"
                        : "monthly-budget-keys monthly-budget-expense-text"
                    }
                  >
                    {total.toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="monthly-budget-keys monthly-budget-income-text">
                    Income:
                  </td>
                  <td className="monthly-budget-keys monthly-budget-income-text">
                    {income.toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="monthly-budget-keys monthly-budget-expense-text">
                    Expense:
                  </td>
                  <td className="monthly-budget-keys monthly-budget-expense-text">
                    {expense.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default MonthlyBudget;
