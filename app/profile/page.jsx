"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		if (session?.user.id) fetchPost();
	}, [session]);

	return <Profile name="My" desc="Welcome to your profile page" data={posts} />;
};

export default MyProfile;
