import React from 'react';
import FamilyTreeItem from './family-tree-item';

const FamilyTree = (props) => {
	const { familyMembers, openAddModal, openUpdateModal, removeFamilyMember } =
		props;

	return (
		<ul>
			{familyMembers.map((member) => {
				return (
					<FamilyTreeItem
						key={member.id}
						member={member}
						openAddModal={openAddModal}
						openUpdateModal={openUpdateModal}
						removeFamilyMember={removeFamilyMember}
					/>
				);
			})}
		</ul>
	);
};

export default FamilyTree;
