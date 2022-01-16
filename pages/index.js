import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import AddMemberModal from '../components/modals/add-member-modal';
import FamilyTree from '../components/family-tree/family-tree';
import UpdateMemberModal from '../components/modals/update-member.modal';

const HomePage = () => {
	const [addMemberModalIsOpened, setAddMemberModalIsOpened] = useState(false);
	const [updateMemberModalIsOpened, setUpdateMemberModalIsOpened] =
		useState(false);
	const [familyMemberSelected, setFamilyMemberSelected] = useState({});
	const [familyMembers, setFamilyMembers] = useState([]);

	const findFamilyMemberByMemberId = (familyMembers, familyMemberId) =>
		familyMembers.reduce((previousMember, currentMember) => {
			if (previousMember) return previousMember; // A family member has been found already
			if (currentMember.id === familyMemberId) return currentMember; // A family member was just found
			if (currentMember.members)
				// Family member not found. Try finding in members[] array
				return findFamilyMemberByMemberId(
					currentMember.members,
					familyMemberId
				);
		}, null);

	const removeFamilyMember = (parentId, memberId) => {
		// Check if user is removing a child family member
		if (parentId) {
			// If user is removing a child family member, find the parent member - so that
			// we can remove the child member from the parent member's members[] array.
			const familyMember = findFamilyMemberByMemberId(familyMembers, parentId);
			const familyMemberIndex = familyMembers.indexOf(familyMember); // Get the index of the parent family member in the familyMembers array

			// Remove child member from the parent member's members[] array
			familyMember.members = familyMember.members.filter(
				(member) => member.id !== memberId
			);

			// Update the state to reflect this new members[] array
			setFamilyMembers((prev) => {
				// Create a new copy of the familyMembers array.
				// It is recommended to not modify the state directly
				const currentMembers = [...prev];

				// Replace the parent member's data in the previous state
				// The new data excludes the child member in the members[] array
				currentMembers[familyMemberIndex] = familyMember;

				return currentMembers;
			});
		} else {
			// If user is removing a root family member, modify the familyMembers[] array directly
			const familyMember = findFamilyMemberByMemberId(familyMembers, memberId);
			const familyMemberIndex = familyMembers.indexOf(familyMember);

			setFamilyMembers((prev) => {
				const currentMembers = [...prev];

				// This automatically removes the family member from the currentMembers array
				currentMembers.splice(familyMemberIndex, 1);

				return currentMembers;
			});
		}
	};

	const updateFamilyMember = (parentId, memberName, memberAge) => {
		const familyMember = findFamilyMemberByMemberId(familyMembers, parentId);
		const familyMemberIndex = familyMembers.indexOf(familyMember);

		// Update family member's details
		familyMember.memberName = memberName;
		familyMember.memberAge = memberAge;

		// Update the state to reflect this updated member
		setFamilyMembers((prev) => {
			// Create a new copy of the familyMembers array.
			// It is recommended to not modify the state directly
			const currentMembers = [...prev];

			// Replace the family member's data in the previous state
			currentMembers[familyMemberIndex] = familyMember;

			return currentMembers;
		});
	};

	const openUpdateModal = (parentId, memberId, memberName, memberAge) => {
		setFamilyMemberSelected({
			parentId,
			memberId,
			memberName,
			memberAge,
		});

		setUpdateMemberModalIsOpened(true);
	};

	const saveFamilyMember = (parentId, name, age) => {
		// Create a new instance of a family member
		// A family member will have a unique id, a name, age, and child members
		// A family member will have a parentId field if it's a child member
		const newFamilyMember = {
			id: uuidv4(),
			memberName: name,
			memberAge: age,
			members: [],
		};

		// Check if user is adding a child family member
		if (parentId) {
			// If user is adding a child family member, find the parent member - so that
			// we can add the new family member to the parent member's members[] array.

			const familyMember = findFamilyMemberByMemberId(familyMembers, parentId);
			const familyMemberIndex = familyMembers.indexOf(familyMember); // Get the index of the parent family member in the familyMembers array

			// Because we are adding a child member, set the child family member's parentId
			newFamilyMember.parentId = parentId;

			// Add the new family member to the parent member's members[] array
			familyMember.members.push(newFamilyMember);

			// Update the state to reflect this new member
			setFamilyMembers((prevState) => {
				// Create a new copy of the familyMembers array.
				// It is recommended to not modify the state directly
				const currentMembers = [...prevState];

				// Replace the parent member's data in the previous state
				// The new data contains the new family member in the members[] array
				currentMembers[familyMemberIndex] = familyMember;

				return currentMembers;
			});
		} else {
			// If user is adding a root family member, then just add the new family member to the array
			setFamilyMembers((prevState) => [...prevState, newFamilyMember]);
		}
	};

	const openAddModal = (parentId, memberId, memberName, memberAge) => {
		setFamilyMemberSelected({
			parentId,
			memberId,
			memberName,
			memberAge,
		});

		setAddMemberModalIsOpened(true);
	};

	return (
		<div>
			<AddMemberModal
				addMemberModalIsOpened={addMemberModalIsOpened}
				setAddMemberModalIsOpened={setAddMemberModalIsOpened}
				familyMemberSelected={familyMemberSelected}
				saveFamilyMember={saveFamilyMember}
			/>

			<UpdateMemberModal
				updateMemberModalIsOpened={updateMemberModalIsOpened}
				setUpdateMemberModalIsOpened={setUpdateMemberModalIsOpened}
				familyMemberSelected={familyMemberSelected}
				updateFamilyMember={updateFamilyMember}
			/>

			<h3>Family Tree</h3>
			<Button variant='filled' onClick={() => openAddModal()}>
				Add Family Member
			</Button>

			{familyMembers.length !== 0 && (
				<FamilyTree
					familyMembers={familyMembers}
					openAddModal={openAddModal}
					openUpdateModal={openUpdateModal}
					removeFamilyMember={removeFamilyMember}
				/>
			)}
		</div>
	);
};

export default HomePage;
