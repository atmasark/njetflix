import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setFamilyFilter } from '../../../state/modules/movies/thunks';
import { State } from '../../types';

const Option = styled.p``;

const Filter = (props: {
  familyFilter: boolean;
  setFamilyFilter: (familyFilter: boolean) => void
}) => {
  const { familyFilter, setFamilyFilter } = props;

  const handleClick = (familyFilter: boolean) => {
    setFamilyFilter(!familyFilter);
  };
  return (
    <>
      <Option onClick={() => handleClick(familyFilter)}>
        Turn family-friendly mode
        {' '}
        {familyFilter ? 'OFF' : 'ON'}
      </Option>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  familyFilter: state.movies.list.familyFilter,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFamilyFilter(familyFilter: boolean) {
    dispatch(setFamilyFilter(familyFilter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
