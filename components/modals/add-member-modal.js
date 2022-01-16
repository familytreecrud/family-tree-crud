import React, { useRef } from 'react';
import { Modal } from '@mantine/core';
import { Input, Button, Space } from '@mantine/core';

const AddMemberModal = (props) => {
	const {
		saveFamilyMember,
		addMemberModalIsOpened,
		setAddMemberModalIsOpened,
		familyMemberSelected,
	} = props;
	const familyMemberNameRef = useRef(null);
	const familyMemberAgeRef = useRef(null);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Get values of name and age inputs
		const memberName = familyMemberNameRef.current?.value;
		const memberAge = familyMemberAgeRef.current?.value;

		saveFamilyMember(
			familyMemberSelected.memberId || familyMemberSelected.parentId || null,
			memberName,
			memberAge
		);

		// Empty the values of the Name and Age inputs so that the user
		// does not need to erase what was entered after clicking the Add Member button
		familyMemberNameRef.current.value = null;
		familyMemberAgeRef.current.value = null;

		setAddMemberModalIsOpened(false);
	};

	return (
		<Modal
			opened={addMemberModalIsOpened}
			onClose={() => setAddMemberModalIsOpened(false)}
			title='Add New Family Member'
		>
			<form onSubmit={handleFormSubmit}>
				<Input ref={familyMemberNameRef} placeholder='Full name' />
				<Space h='md' />
				<Input ref={familyMemberAgeRef} placeholder='Age' />
				<Space h='md' />
				<Button type='submit'>Add Member</Button>
			</form>
		</Modal>
	);
};

export default AddMemberModal;
