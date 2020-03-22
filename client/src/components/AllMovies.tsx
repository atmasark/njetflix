import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ListElement, State } from './types';

const Wrapper = styled.div`
  display: flex;
`;

const PlaceholderText = styled.p`
font-size: 28px;
`;

const AllMovies = (props: {
  movies: ListElement[];
}) => {
  const {
    movies,
  } = props;
  return (
    <Wrapper>
      {movies && (
        <>
          <PlaceholderText>All movies here</PlaceholderText>
        </>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.list.data,
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AllMovies);
