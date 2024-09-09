import classNames from 'classnames';

type props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<props> = ({ children, className }) => {
  return (
    <div className={classNames('container mx-auto px-2 sm:px-4 md:px-8', className)}>
      {children}
    </div>
  );
};

export default Container;