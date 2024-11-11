import { Routes } from '@angular/router';
import { HomeComponent } from './MainComponent/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { NewsComponent } from './pages/news/news.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BagComponent } from './components/bag/bag.component';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';
import { SearchallComponent } from './pages/searchall/searchall.component';
import { UsereditComponent } from './pages/useredit/useredit.component';
import {  AuthGuard } from './guard/auth.guard';
import { ErrorComponent } from './error/error.component';
import { AdminGuard } from './guard/admin.guard';
// import { TrendingComponent } from './pages/trending/trending.component';
import { CarousalComponent } from './components/carousal/carousal.component';

// import { ProductFormComponent } from './product-form/product-form.component';
export const routes: Routes = [
 { path: '', title: "Home Page", component: HomeComponent},
  { path: 'signup', title: "Sign Up", component: SignupComponent },
  { path: 'login', title: "Log In", component: LoginComponent },
  // { path: 'about', title: "About Us", component: AboutComponent },
  { path: 'services', title: "Our Services", component: ServicesComponent },
  { path: 'faq', title: "FAQ", component: FAQComponent },
  // { path: 'news', title: "Latest News", component: NewsComponent },
  // { path: 'contact', title: "Contact Us", component: ContactComponent },
  { path: 'products/:id', title: "Bag", component: BagComponent },
  { path: 'admin', title: "Admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', title: "Dashboard", component: DashboardComponent },
  { path: 'edit/:id', title: "Product Edit", component: ProductEditComponent },
  { path: 'profile', title: "Profile", component: ProfileComponent },
  // { path: 'trending', title: "Trending", component: TrendingComponent },
  { path: 'search/:id', title: "Product Search", component: ProductSearchComponent },
  { path: 'searchall', title: "Product all Search", component: SearchallComponent },
  { path: 'edituser/:id', title: "User Edit", component: UsereditComponent },
  { path: '**', title: "Page Not Found", component: ErrorComponent },
];
