import React, {Component} from "react";
import BoardService from "../service/BoardService";

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardType: '',
            title: '',
            contents: '',
            userId: '',
            boardNo : this.props.match.params.boardNo,
            board : {}            
        }

        this.changeBoardTypeHandler = this.changeBoardTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    changeBoardTypeHandler = (event) => {
        this.setState({boardType: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentsHandler = (event) => {
        this.setState({contents: event.target.value});
    }

    changeUserIdHandler = (event) => {
        this.setState({userId: event.target.value});
    }

    createBoard = (event) => {
        event.preventDefault();
        let board = {
            boardType: this.state.boardType,
            title: this.state.title,
            contents: this.state.contents,
            userId: this.state.userId
        };
        
        if(this.state.boardNo === undefined) {               // 글 작성
            BoardService.createBoard(board).then((res) => {
                this.props.history.push('/board');
            });
        } else {                                            // 글 수정
            BoardService.updateBoard(this.state.boardNo, board).then((res) => {
                this.props.history.push('/board');

            });
        }
    }

    cancel() {
        this.props.history.push('/board')
    }

    componentDidMount() {
        if(this.state.boardNo !== undefined) {
            BoardService.getOneBoard(this.state.boardNo).then(res => {
                // this.setState({board: res.data});
                this.setState({boardType:res.data.boardType});
                this.setState({title:res.data.title});
                this.setState({contents:res.data.contents});
                this.setState({userId:res.data.userId});
                console.log(res);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">새 글을 작성해 주세요.</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select placeholder="type" name="type" className="form=control" value={this.state.boardType} onChange={this.changeBoardTypeHandler}>
                                            <option value="1">자유게시판</option>
                                            <option value="2">질문과 답변</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Contents</label>
                                        <textarea placeholder="contents" name="contents" className="form-control" value={this.state.contents} onChange={this.changeContentsHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>UserId</label>
                                        <input placeholder="userId" name="userId" className="form-control" value={this.state.userId} onChange={this.changeUserIdHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoard}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CreateBoardComponent;