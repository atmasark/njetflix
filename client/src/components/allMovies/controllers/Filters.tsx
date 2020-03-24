import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setFamilyFilter, setTitleFilter } from '../../../state/modules/movies/thunks';
import { State } from '../../types';

const FamilyFilterContainer = styled.div``;
const FamilyFilter = styled.p`
  font-size: 16px;
  ${FamilyFilterContainer}:hover & {
    cursor: pointer;    
  }
`;

const TitleFilter = styled.div`
  display: flex;
`;

const TitleInput = styled.input`
  border: 2px solid #a9a9a9;
  border-radius: 2px;
  font-size: 16px;
`;

const Filters = (props: {
  familyFilter: boolean;
  titleFilter?: string;
  setFamilyFilter: (familyFilter: boolean) => void
  setTitleFilter: (titleFilter: string) => void
}) => {
  const {
    familyFilter, titleFilter, setFamilyFilter, setTitleFilter,
  } = props;

  const handleClick = (familyFilter: boolean) => {
    setFamilyFilter(!familyFilter);
  };

  const handleKeyPress = (keyword: string) => {
    setTitleFilter(keyword);
  };
  return (
    <>
      <TitleFilter>
        <TitleInput placeholder="🔍 Search" value={titleFilter} onChange={(e) => handleKeyPress(e.target.value)} />
      </TitleFilter>
      <FamilyFilterContainer>
        <FamilyFilter onClick={() => handleClick(familyFilter)}>
          Turn family-friendly mode
          {' '}
          {familyFilter ? 'OFF' : 'ON'}
        </FamilyFilter>
      </FamilyFilterContainer>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  familyFilter: state.movies.list.familyFilter,
  titleFilter: state.movies.list.titleFilter,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFamilyFilter(familyFilter: boolean) {
    dispatch(setFamilyFilter(familyFilter));
  },
  setTitleFilter(titleFilter: string) {
    dispatch(setTitleFilter(titleFilter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
