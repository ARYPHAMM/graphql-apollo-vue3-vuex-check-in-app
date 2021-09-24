import { useRouter } from "vue-router";

export const useUser = () => {
  const router = useRouter();
  const levelUser = (level) =>{
    switch (level) {
      case "master":
        router.push('all-users');
        break;
      case 0:
        router.push('/');
        break;
    
      default:
        break;
    }
  }
  return {
    levelUser
  };
};

