import { combineReducers } from "redux";
import { authReducer } from './auth';
import { detailReducer} from './detail';
import { userReducer } from "./user";
import { catalogReducer } from "./catalog";
import { subCatalogReducer } from "./subCatalog";
import { courseReducer } from "./course";
import { cartReducer } from "./cart";
import { lessonReducer } from "./lesson";
import { lectureReducer } from "./lecture";
import { paymentReducer } from "./payment";
import { savedCourseReducer } from "./savedCourse";
import { reviewReducer } from "./review";
import { dashboardReducer } from "./dashboard";
import { alertReducer } from "./alert";

export const rootReducer = combineReducers({
    auth: authReducer,
    detail: detailReducer,
    user: userReducer,
    catalog: catalogReducer,
    subCatalog: subCatalogReducer,
    course: courseReducer,
    cart: cartReducer,
    lesson: lessonReducer,
    lecture: lectureReducer,
    payment: paymentReducer,
    savedCourse: savedCourseReducer,
    review: reviewReducer,
    dashboard: dashboardReducer,
    alert: alertReducer,
});