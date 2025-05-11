import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import {useAppStore} from "@/stores/store.js";
import UserView from "@/views/UserView.vue";
import AddUserCompo from "@/components/User/AddUserCompo.vue";
import UpdateUserCompo from "@/components/User/UpdateUserCompo.vue";
import DeleteUserCompo from "@/components/User/DeleteUserCompo.vue";
import ShowUserCompo from "@/components/User/ShowUserCompo.vue";
import AssetView from "@/views/AssetView.vue";
import ShowAssetCompo from "@/components/Asset/ShowAssetCompo.vue";
import AddAssetCompo from "@/components/Asset/AddAssetCompo.vue";
import UpdateAssetCompo from "@/components/Asset/UpdateAssetCompo.vue";
import DeleteAssetCompo from "@/components/Asset/DeleteAssetCompo.vue";
import BrandView from "@/views/BrandView.vue";
import ShowBrandCompo from "@/components/Brand/ShowBrandCompo.vue";
import AddBrandCompo from "@/components/Brand/AddBrandCompo.vue";
import UpdateBrandCompo from "@/components/Brand/UpdateBrandCompo.vue";
import DeleteBrandCompo from "@/components/Brand/DeleteBrandCompo.vue";
import CategoryView from "@/views/CategoryView.vue";
import AddCategoryCompo from "@/components/Category/AddCategoryCompo.vue";
import ShowCategoryCompo from "@/components/Category/ShowCategoryCompo.vue";
import UpdateCategoryCompo from "@/components/Category/UpdateCategoryCompo.vue";
import DeleteCategoryCompo from "@/components/Category/DeleteCategoryCompo.vue";
import CompanyView from "@/views/CompanyView.vue";
import ShowCompanyCompo from "@/components/Company/ShowCompanyCompo.vue";
import AddCompanyCompo from "@/components/Company/AddCompanyCompo.vue";
import UpdateCompanyCompo from "@/components/Company/UpdateCompanyCompo.vue";
import DeleteCompanyCompo from "@/components/Company/DeleteCompanyCompo.vue";
import DeleteDepartmentCompo from "@/components/Department/DeleteDepartmentCompo.vue";
import UpdateDepartmentCompo from "@/components/Department/UpdateDepartmentCompo.vue";
import AddDepartmentCompo from "@/components/Department/AddDepartmentCompo.vue";
import ShowDepartmentCompo from "@/components/Department/ShowDepartmentCompo.vue";
import DepartmentView from "@/views/DepartmentView.vue";
import TraningFormView from "@/views/TrainingFormView.vue";
import Tools from "@/components/Custody/ToolsView.vue";
import ToolsView from "@/components/Custody/ToolsView.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component:DashboardView,
    children:[
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView
      },

      // Begin Asset Section
      // Assets Section ------------------------- Assets Section
      {
        path: "assets",
        name: "Assets",
        component: AssetView,
      },
      {
        path: "/show-asset/:assetId",
        name: "ShowAsset",
        component: ShowAssetCompo,
      },
      {
        path: "/add-asset",
        name: "AddAsset",
        component: AddAssetCompo,
      },
      {
        path: "/update-asset/:assetId",
        name: "UpdateAsset",
        component: UpdateAssetCompo,
      },
      {
        path: "/delete-asset/:assetId",
        name: "DeleteAsset",
        component: DeleteAssetCompo,
      },

      // End Assets Section ------------------------- Asset Section

        // Begin Brand Section
      // Brands Section ------------------------- Brands Section
      {
        path: "brands",
        name: "Brands",
        component: BrandView,
      },
      {
        path: "/show-brand/:brandId",
        name: "ShowBrand",
        component: ShowBrandCompo,
      },
      {
        path: "/add-brand",
        name: "AddBrand",
        component: AddBrandCompo,
      },
      {
        path: "/update-brand/:brandId",
        name: "UpdateBrand",
        component: UpdateBrandCompo,
      },
      {
        path: "/delete-brand/:brandId",
        name: "DeleteBrand",
        component: DeleteBrandCompo,
      },

      // End Brand Section ------------------------- Brand Section

      // Begin Category Section
      // Categories Section ------------------------- Categories Section
      {
        path: "/categories",
        name: "Categories",
        component: CategoryView,
      },
      {
        path: "/show-category/:categoryId",
        name: "ShowCategory",
        component: ShowCategoryCompo,
      },
      {
        path: "/add-category",
        name: "AddCategory",
        component: AddCategoryCompo,
      },
      {
        path: "/update-category/:categoryId",
        name: "UpdateCategory",
        component: UpdateCategoryCompo,
      },
      {
        path: "/delete-category/:categoryId",
        name: "DeleteCategory",
        component: DeleteCategoryCompo,
      },

      // End Category Section ------------------------- Category Section

      // Begin Company Section
      // Companies Section ------------------------- Companies Section
      {
        path: "/companies",
        name: "Companies",
        component: CompanyView,
      },
      {
        path: "/show-company/:companyId",
        name: "ShowCompany",
        component: ShowCompanyCompo,
      },
      {
        path: "/add-company",
        name: "AddCompany",
        component: AddCompanyCompo,
      },
      {
        path: "/update-company/:companyId",
        name: "UpdateCompany",
        component: UpdateCompanyCompo,
      },
      {
        path: "/delete-company/:companyId",
        name: "DeleteCompany",
        component: DeleteCompanyCompo,
      },

      // End Company Section ------------------------- Company Section

      // Begin Department Section
      // Departments Section ------------------------- Departments Section
      {
        path: "/departments",
        name: "Departments",
        component: DepartmentView,
      },
      {
        path: "/show-departments/:departmentsId",
        name: "ShowDepartment",
        component: ShowDepartmentCompo,
      },
      {
        path: "/add-departments",
        name: "AddDepartment",
        component: AddDepartmentCompo,
      },
      {
        path: "/update-departments/:departmentId",
        name: "UpdateDepartment",
        component: UpdateDepartmentCompo,
      },
      {
        path: "/delete-departments/:departmentsId",
        name: "DeleteDepartment",
        component: DeleteDepartmentCompo,
      },

      // End Company Section ------------------------- Company Section



        // Begin User Section
      // Users Section ------------------------- Users Section
      {
        path: "/users",
        name: "Users",
        component: UserView,
      },
      {
        path: "/show-user/:userId",
        name: "ShowUser",
        component: ShowUserCompo,
      },
      {
        path: "/add-user",
        name: "AddUsers",
        component: AddUserCompo,
      },
      {
        path: "/update-user/:userId",
        name: "UpdateUser",
        component: UpdateUserCompo,
      },
      {
        path: "/delete-user/:userId",
        name: "DeleteUser",
        component: DeleteUserCompo,
      },

      // End Users Section ------------------------- Users Section




    ]
  },
  {
    path: '/custody-tools',
    name: 'CustodyTools',
    component: ToolsView,
  },
  {
    path: '/training',
    name: 'Training',
    component: TraningFormView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/*router.beforeEach((to, from, next) => {
  useAppStore().initializeAuth();

  if (to.meta.requiresAuth && !useAppStore().isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && useAppStore().isAuthenticated) {
    next('/dashboard/home')
  } else {
    next()
  }
})*/

export default router
