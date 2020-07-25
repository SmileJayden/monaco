import React from 'react';
import styled from 'styled-components';

interface RecursiveProps {
  num: number;
}

const Recursive: React.FC<RecursiveProps> = ({ num }) => {
  const RecursiveWrapper = styled.div`
    padding: 10px;
    background-color: #${(Math.random().toString(16) + '00000').slice(2, 8)};
  `;
  return (
    <RecursiveWrapper>
      {num}
      {num > 0 && <Recursive num={num - 1} />}
    </RecursiveWrapper>
  );
};

export default Recursive;
