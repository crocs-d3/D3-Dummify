import React, { Component } from "react";
// import Prism from "prismjs";
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import "../Styles/prism.css";

class CodeDisplay extends Component {
  // componentDidUpdate() {
  //   // We need to re-style the code everytime we change it
  //   Prism.highlightAll();
  // }

  render() {
    return (      
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="blah2"
        // onLoad={this.onLoad}
        onChange={this.props.updateCodeText}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={this.props.codeText} 
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}
      />         
    );
  }
}



export default CodeDisplay;