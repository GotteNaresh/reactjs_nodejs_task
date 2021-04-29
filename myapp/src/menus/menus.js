import React from 'react';
class Menus extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			menus: [],
			filelist: []
		};
	}
	getRow = (id) => {
		fetch("http://localhost:3001/api/user/filelist/"+id)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					filelist: result
				});
			},
        (error) => {
        	this.setState({
        		isLoaded: true,
        		error
        	});
        }
        )
	}
	componentDidMount() {

		fetch("http://localhost:3001/api/user/menuslist")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					menus: result
				});
			},
        (error) => {
        	this.setState({
        		isLoaded: true,
        		error
        	});
        }
        )
	}

	render() {
		const { error, isLoaded, menus, filelist } = this.state;
		return (
			<div>
			<ul class="sidenav" >
			{menus.map(menu => (
				<li key={menu.id}>
				<a onClick={(e) => this.getRow(menu.menu, e)}> {menu.menu} </a>
				</li>
				))}
			</ul>
			<div class="container">
			<h2>File Details</h2>
			<table class="table">
			<thead>
			<tr>
			<th>File </th>
			<th>Size</th>
			</tr>
			</thead>
			<tbody>
			{filelist.map(file => (
				<tr class="content" >
				<td key={file.id}>
				{file.menu} 
				</td><td> {file.filesize}</td>
				</tr>
			))}
				</tbody>
				</table>
				</div>
				</div>
				);
			}
		}
export default Menus;