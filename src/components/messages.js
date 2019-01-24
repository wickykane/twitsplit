import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 15px;
`;

const TextArea = styled.textarea``;

const Button = styled.button`
  padding: 15px;
  color: #fff;
  background: #000;
  transition: all 0.5 ease;
  display: block;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      result: ""
    };
  }

  changeMessage = message => {
    this.setState({
      ...this.state,
      message
    });
  };

  getMessageResult = () => {
    const result = splitMessage(this.state.message);
    this.setState({
      ...this.state,
      result
    });
  };
  render() {
    return (
      <Wrapper>
        <TextArea
          onChange={e => this.changeMessage(e.target.value)}
          cols="50"
          rows="10"
        />
        <Button onClick={() => this.getMessageResult()}>SEND</Button>
        <div>{JSON.stringify(this.state.result)}</div>
      </Wrapper>
    );
  }
}

export function splitMessage(text, limit = 50, totalChunk = 0) {
  text = text.trim();
  const textLength = text.length;
  if (textLength <= limit) {
    return text;
  }
  const words = text.split(" ");
  const validWord = words.every(word => word.length <= limit);
  if (validWord) {
    let results = [];
    totalChunk = totalChunk || Math.round(textLength / limit);
    let pivot = 0;
    for (let i = 1; i <= totalChunk; i++) {
      let chunk = `${i}/${totalChunk}`;
      let totalLength = chunk.length;
      while (totalLength <= limit && pivot < words.length) {
        chunk = [chunk, words[pivot++]].join(" ");
        totalLength = [chunk, words[pivot]].join(" ").length;
      }
      results.push(chunk);
    }
    return pivot !== words.length
      ? splitMessage(text, limit, totalChunk + 1)
      : results;
  } else {
    return "Invalid input!";
  }
}
