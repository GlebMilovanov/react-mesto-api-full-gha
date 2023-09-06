import { ThreeDots } from 'react-loader-spinner';
import { useIsMobile } from '../hooks/useIsMobile';

export const Loader = () => {
  const isMobile = useIsMobile();

  return (
    <ThreeDots
      height={isMobile ? '17' : '22'}
      width="40"
      radius="9"
      color="#fff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};
