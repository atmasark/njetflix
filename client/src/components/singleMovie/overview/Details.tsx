import React from 'react';
import styled from 'styled-components';

const ListRow = styled.div`
  display: flex;
`;

const Key = styled.p`
  padding-right: 5px;
  margin: 5px 0 0 0;
`;

const Value = styled.p`
  color: #404040;
  margin: 5px 0 0 0;
`;

export default (props: { currentMovie: any }) => {
  const { currentMovie } = props;
  return (
    <>
      <ListRow>
        <Key>Genre: </Key>
        {currentMovie.data.genre && (
          <Value>
            {currentMovie.data.genre.join(', ')}
          </Value>
        )}
      </ListRow>
      <ListRow>
        <Key>
          {currentMovie.data.director && currentMovie.data.director.length > 1 ? 'Directors: ' : 'Director: '}
        </Key>
        {currentMovie.data.director && (
          <Value>
            {currentMovie.data.director.join(', ')}
          </Value>
        )}
      </ListRow>
      <ListRow>
        <Key>Starring: </Key>
        {currentMovie.data.actors && (
          <Value>
            {currentMovie.data.actors.join(', ')}
          </Value>
        )}
      </ListRow>
    </>
  );
};
