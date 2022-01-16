import React from 'react';
import FamilyTree from './family-tree';
import { Button, Group } from '@mantine/core';

const FamilyTreeItem = (props) => {
	const { member, openAddModal, openUpdateModal, removeFamilyMember } = props;

	return (
		<li>
			<Group spacing='xs'>
				<span>{member.memberName}</span>
				<Button
					color='green'
					variant='outline'
					onClick={() =>
						// member.parentId is initially "null" because root family member has no parent
						openAddModal(member.parentId, member.id, member.memberName, member.memberAge)
					}
				>
					Add
				</Button>
				<Button
					color='orange'
					variant='outline'
					onClick={() =>
						// member.parentId is initially "null" because root family member has no parent
						openUpdateModal(
							member.parentId,
							member.id,
							member.memberName,
							member.memberAge
						)
					}
				>
					Update
				</Button>
				<Button
					color='red'
					variant='outline'
					onClick={() => removeFamilyMember(member.parentId, member.id)}
				>
					Remove
				</Button>
			</Group>

			{/* Display the member's child members */}
			<FamilyTree
				familyMembers={member.members}
				openAddModal={openAddModal}
				removeFamilyMember={removeFamilyMember}
				openUpdateModal={openUpdateModal}
			/>
		</li>
	);
};

export default FamilyTreeItem;
