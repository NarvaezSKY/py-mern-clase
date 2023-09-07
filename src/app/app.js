import React, {Component} from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {
            title:'',
            description:'',
            tasks: [],
            _id:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.addTask=this.addTask.bind(this)
    }
    addTask(e){
        if(this.state._id) {
            fetch(`/api/task/${this.state._id}`, {
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                M.toast({html:'Tarea actualizada.'})
                this.setState({title:'', description:'', _id:''})
                this.fetchTasks()
            })
        }
        else{   
            fetch('/api/task',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)  
                M.toast({html:'Tarea guardada con éxito.'})
                this.setState({title:'', description:''})
                this.fetchTasks()
            })
            .catch(err=>console.error(err))
            console.log(this.state)
        }
        e.preventDefault()
    }
componentDidMount(){
        this.fetchTasks()
    }
    fetchTasks(){
        fetch('api/task')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({tasks:data})
            console.log(this.state.tasks)
        })
    }
    deleteTask(id){
      if(confirm('Estas seguro de querer eliminar la tarea?')){
        fetch(`/api/task/${id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            M.toast({html:'Tarea eliminada con éxito.'})
            this.fetchTasks()
        })
      }
    }

    editTask(id){
        fetch(`/api/task/${id}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({
                    title:data.title,
                    description: data.description,
                    _id:data._id
                })
        })
        
    }

    handleChange(e){
        const{name,value}=e.target
        this.setState({
            [name]:value
        })
    }
    
    render(){
        return(
            <div>
                {/* {navigation} */}
                <nav className='light-blue darken-4'>
                <div className='container'>
                    <a className='brand-logo' href="/">Stack MERN</a>
                </div>
                </nav>

                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title'onChange={this.handleChange} type='text' placeholder='Tarea...' value={this.state.title}/> 
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description' onChange={this.handleChange} placeholder='Descripcion de la tarea...' className='materialize-textarea' value={this.state.description}></textarea>
                                            </div>
                                            <button type='submit' className='btn light-blue darken-4'>
                                                Agregar tarea
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo de la Tarea</th>
                                        <th>Descripcion de la Tarea</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={()=>this.deleteTask(task._id)} ><i className='material-icons'>delete</i></button>
                                                        <button className='btn light-blue darken-4' onClick={()=>this.editTask(task._id)} style={{margin:'4px'}}><i className='material-icons'>edit</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;