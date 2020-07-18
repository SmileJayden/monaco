import React from 'react';
import '~/assets/css/main.css';
import {} from 'styled-components/cssprop';
import styled from 'styled-components';

import FileLoadHandler from '~/components/FileLoadHandler';
import Sidebar from '~/components/Sideber';
import Tabs from '~/components/Tabs';
import CodingRoom from '~/components/CodingRoom';

const AppWrapper = styled.div`
  position: relative;

  .program {
    display: flex;
    flex-direction: row;

    .editor {
      flex: 1;
    }
  }
`;

const App = () => {
  return (
    <AppWrapper>
      <FileLoadHandler />
      <div className="program">
        <Sidebar />
        <div className="editor">
          <Tabs />
          <CodingRoom minHeight={500} minWidth={750} />
        </div>
      </div>
    </AppWrapper>
  );
};
export default App;
