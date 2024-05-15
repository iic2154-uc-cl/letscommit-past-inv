import Prism from "prismjs";
import * as React from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import "./prism.css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-git"
import "prismjs/components/prism-haskell"
import "prismjs/components/prism-diff"
import "prismjs/plugins/diff-highlight/prism-diff-highlight"


class CodeBlock extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      Prism.highlightAll();
    }
    render() {
        Prism.highlightAll();
        return (
            <Box sx={{heigth:1, width:1, margin:0, padding:0}}>
                <Typography variant='code' sx={{margin:2}}>{this.props.fileName}</Typography>
            <pre>
            <code className="diff-highlight language-diff-javascript">
            {this.props.code}
            </code>
            </pre>
            </Box>
        );
    }
}
export default CodeBlock;