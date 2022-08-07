import React from 'react'
import axios from 'axios'
import '../styles/TaskList.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { API_URL } from '../config/environment';

class TaskList extends React.Component {
    state = {
        task: '',
        taskList: []
    }

    componentDidMount() {
        this.getTaskList();
    }

    componentDidUpdate(task) {
        this.getTaskList(task)
    }

    getTaskList = () => {
        axios.get('stripeapi',API_URL+'/tasks')
            .then((response) => response.data)
            .then((response) => {
                this.setState({taskList: response})
            })
    }

    onDeleteClick = (taskid) => {
        axios.delete(API_URL+`/deleteTask/${taskid}`)
        this.getTaskList()
    }

    onSubmitClick = () => {
        axios.post(API_URL+'/addTask', {
            task: this.state.task
        })
        this.getTaskList()
        this.setState({task: ''})
    }

    render() {
        return (
            <div className='taskList'>
                <h2 style={{paddingTop: '10px'}}>タスク管理</h2>
                    <div className='ui input' style={{paddingBottom: '10px'}}>
                        <input value={this.state.task} type='text' onChange={(e) => this.setState({task: e.target.value})} placeholder='Todoを追加'/>
                </div>
                    {this.state.task === '' || this.state.task.length > 30 ? '' : 
                        <Button className='ui primary button basic' onClick={() => this.onSubmitClick()}>追加</Button>
                    }
                    <hr />
                    <div className="ui cards" style={{padding: '10px 10px 0 10px', display:'flex', justifyContent: 'space-between'}}>
                    {
                        this.state.taskList.map((task, taskid) => (
                            <div className="card" key={taskid}>
                                <div className="content">
                                    <div className="meta" style={{fontWeight: 'bold', fontSize:'20px', paddingBottom: '5px'}}>
                                        {task.task}
                                    </div>
                                    <div className="extra content">
                                        <div className="ui buttons">
                                            <Button className="ui basic red button" onClick={() => this.onDeleteClick(task.taskid)}>
                                                <DeleteIcon/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        )
    }
}

export default TaskList