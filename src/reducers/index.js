import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import BudgetReducer from "./BudgetReducer";
import ReceiptReducer from "./ReceiptReducer";
import ApplicationReducer from "./ApplicationReducer";

export default combineReducers({
  Auth: AuthReducer,
  User: UserReducer,
  Budget: BudgetReducer,
  Receipt: ReceiptReducer,
  Application: ApplicationReducer,
});
