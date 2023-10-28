"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const getPostByTag = async (tag) => {
		const response = await fetch(`/api/prompt/tag`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tag: tag }),
		});
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};
		fetchPost();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for tag or username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList data={posts} handleTagClick={getPostByTag} />
		</section>
	);
};

export default Feed;
