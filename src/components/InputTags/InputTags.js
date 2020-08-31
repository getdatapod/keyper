import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const InputTags = () => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState([{ name: 'Web' }]);

  const addTag = () => {
    const updatedTags = [...tags, { name: value }];
    setTags(updatedTags);
  };

  return (
    <Container>
      <div>
        {tags?.map((tag) => (
          <Tags>{tag.name}</Tags>
        ))}
      </div>
      <Input
        type="text"
        placeholder=""
        value={value}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            addTag();
            setValue('');
          }
        }}
        onChange={(e) => setValue(e.target.value)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 20rem;
  height: fit-content;
  min-height: 3rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid grey;
  border-radius: 4px;

  &:hover {
    border: 1px solid blueviolet;
  }
`;

const Tags = styled.span`
  padding: 0rem 0.4rem;
  background-color: blueviolet;
  border-radius: 3px;
  font-size: 1rem;
  color: white;

  &:not(:last-child) {
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

const Input = styled.input`
  width: 0%;
  flex-grow: 1;
  height: fit-content;
  outline: none;
  border: none;
  background: none;
  border-radius: 3px;
  padding: 0.2rem 0.4rem;
  font-size: 1rem;
`;

export default InputTags;
