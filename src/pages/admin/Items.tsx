import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Items = () => {
	const [items, setItems] = useState([]);
	const [currentItem, SetCurrentItem] = useState(false);
	const [isUpdate, SetIsUpdate] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3310/api/items")
			.then((resp) => resp.json())
			.then((data) => setItems(data))
			.catch((error) => console.error(error));
	}, [isUpdate]);

	return (
		<div>
			<h1>Gestion des Items</h1>
			<table>
				<tr>
					<td style={{ minWidth: 200 }}>Nom</td>
					<td>Action</td>
				</tr>
				{items.length > 0 ? (
					items.map((item) => {
						return (
							<Item
								key={item.id}
								item={item}
								SetCurrentItem={SetCurrentItem}
								SetIsUpdate={SetIsUpdate}
							/>
						);
					})
				) : (
					<tr>
						<td colSpan={3}>
							<div>Aucunes données</div>
						</td>
					</tr>
				)}
				{currentItem && <CurrentItem currentItem={currentItem} />}
			</table>
		</div>
	);
};

const Item = ({ item, SetCurrentItem, SetIsUpdate }) => {
	const [isEdit, SetIsEdit] = useState(false);
	const [title, SetTitle] = useState(false);

	const handleEdit = () => {
		console.log(item);
		SetIsEdit(true);
	};

	const HandleDelete = async () => {
		const resp = await fetch(`http://localhost:3310/api/items/${item.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		if (resp.ok) {
			SetIsUpdate(true);
			SetTitle(false);
		}
	};

	const handleSave = async () => {
		const newData = { id: item.id, title: title };

		const resp = await fetch(`http://localhost:3310/api/items/${item.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newData),
		});

		const data = await resp.json();
		if (resp.ok) {
			SetIsUpdate(true);
			SetTitle(false);
		}
	};

	return (
		<tr>
			<td>
				{isEdit ? (
					<>
						<input
							type="text"
							name="title"
							value={title ? title : item.title}
							onChange={(e) => SetTitle(e.target.value)}
						/>
						<button onClick={handleSave}>OK</button>
					</>
				) : (
					item.title
				)}
			</td>
			<td>
				<VisibilityIcon onClick={() => SetCurrentItem(item)} />
				<ModeEditIcon onClick={handleEdit} />
				<DeleteSweepIcon onClick={HandleDelete} />
			</td>
		</tr>
	);
};

const CurrentItem = ({ currentItem }) => {
	return (
		<>
			<hr />
			<div>Item sélectionné : {currentItem.title}</div>
		</>
	);
};

export default Items;
