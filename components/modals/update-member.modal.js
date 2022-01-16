import React, { useRef } from 'react';
import { Modal } from '@mantine/core';
import { Input, Button, Space } from '@mantine/core';

const UpdateMemberModal = (props) => {
	const {
		updateMemberModalIsOpened,
		setUpdateMemberModalIsOpened,
		familyMemberSelected,
		updateFamilyMember,
	} = props;
	const familyMemberNameRef = useRef(null);
	const familyMemberAgeRef = useRef(null);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Get values of name and age inputs
		const memberName = familyMemberNameRef.current?.value;
		const memberAge = familyMemberAgeRef.current?.value;

		updateFamilyMember(
			familyMemberSelected.memberId || familyMemberSelected.parentId || null,
			memberName || familyMemberSelected.memberName, // If user submitted but did not enter any name, use the previous name
			memberAge || familyMemberSelected.memberAge // If user submitted but did not entey any age, use the previous age
		);

		// Empty the values of the Name and Age inputs so that the user
		// does not need to erase what was entered after clicking the Add Member button
		familyMemberNameRef.current.value = null;
		familyMemberAgeRef.current.value = null;

		setUpdateMemberModalIsOpened(false);
	};

	return (
		<Modal
			opened={updateMemberModalIsOpened}
			onClose={() => setUpdateMemberModalIsOpened(false)}
			title='Update Family Member'
		>
			<form onSubmit={handleFormSubmit}>
				<Input
					ref={familyMemberNameRef}
					placeholder={familyMemberSelected.memberName}
				/>
				<Space h='md' />
				<Input
					ref={familyMemberAgeRef}
					placeholder={familyMemberSelected.memberAge}
				/>
				<Space h='md' />
				<Button type='submit'>Update Member</Button>
			</form>
		</Modal>
	);
};

export default UpdateMemberModal;
