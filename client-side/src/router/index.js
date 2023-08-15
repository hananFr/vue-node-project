import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import About from '@/views/About';
import Contact from '@/views/Contact';
import SocialProjects from '@/views/SocialProjects';
import Travels from '@/views/Travels';
import SignupVue from '@/views/Signup.vue';
import SigninVue from '@/views/Signin.vue';
import logoutVue from '@/views/logout.vue';
import CreateCardVue from '@/views/CreateCard.vue';
import UpdateCardVue from '@/views/UpdateCard.vue';
import TravelsVue from '@/views/Travels.vue';
import EditProfileVue from '@/views/EditProfile.vue';
import ManageCommitVue from '@/views/ManageCommit.vue';
import UsersVue from '@/views/Users.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/social-projects',
    name: 'social-projects',
    component: SocialProjects
  },
  {
    path: '/travels',
    name: 'travels',
    component: TravelsVue
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupVue
  },
  {
    path: '/signin1369',
    name: 'signin',
    component: SigninVue
  },
  {
    path: '/create-card',
    name: 'create-card',
    component: CreateCardVue
  },
  {
    path: '/update-card/:id',
    name: 'update-card',
    component: UpdateCardVue
  },
  {
    path: '/edit-profile/:id',
    name: 'edit-profile',
    component: EditProfileVue
  },
  {
    path: '/logout',
    name: 'logout',
    component: logoutVue
  },
  {
    path: '/manage-commits',
    name: 'manage-commits',
    component: ManageCommitVue
  },
  {
    path: '/users',
    name: 'users',
    component: UsersVue
  },




]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
