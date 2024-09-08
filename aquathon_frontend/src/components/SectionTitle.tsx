import React from 'react';

import { ComponentProps } from '@/domains/race/interface';

const SectionTitle: React.FC<ComponentProps> = ({
  children,
  className = 'text-xl sm:text-2xl md:text-3xl font-semibold pb-2 sm:pb-3 md:pb-5',
}) => {
  return <h1 className={className}>{children}</h1>;
};

export default SectionTitle;
