import React from 'react';

import TitledSection from './Components/TitledSection';

const NameDetailStatus = ({ data }) => (
  <>
    <TitledSection
      title="Data to be formatted"
    >
      {JSON.stringify(data)}
    </TitledSection>
  </>
);

export default NameDetailStatus;
