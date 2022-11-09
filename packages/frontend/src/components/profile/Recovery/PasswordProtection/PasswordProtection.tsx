import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEncrypted } from '../../../../utils/encryption/keys';
import EnterPasswordForm from '../../../accounts/EnterPasswordForm';
import SetPassword from '../../../accounts/SetPassword';
import FormButton from '../../../common/FormButton';
import Modal from '../../../common/modal/Modal';
import Container from '../../../common/styled/Container.css';
import RecoveryMethod from '../RecoveryMethod';
import {
    CreatePasswordDescription,
    CreatePasswordTitle,
    PasswordForm,
    Controls
} from './ui';

type PasswordProtectionProps = {
    onWalletEncrypt: (password: string) => void;
}

const PasswordProtection: FC<PasswordProtectionProps> = ({
    onWalletEncrypt
}) => {
    const { t } = useTranslation();

    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);
    const [password, setPassword] = useState<string|null>(null);

    const toggleConfirmPassModal = useCallback(() =>
        setShowConfirmPass(!showConfirmPass),
    [showConfirmPass]);

    const toggleCreatePassModal = useCallback(() =>
        setShowCreatePass(!showCreatePass),
    [showCreatePass]);

    const toggleChangePassModal = useCallback(() =>
        setShowChangePass(!showChangePass),
    [showChangePass]);

    const handleConfirmDeletePassword = useCallback((password) => {
        toggleConfirmPassModal();
    }, [toggleConfirmPassModal]);

    const handleCreateSubmit = useCallback(() => {
        onWalletEncrypt(password);
        toggleCreatePassModal();
    }, [password, toggleCreatePassModal]);

    return (
        <>
            <RecoveryMethod
                title={t('passwordProtection.title')}
                description={t('passwordProtection.description')}
                methodEnabled={isEncrypted()}
                onEnable={toggleCreatePassModal}
                onDisable={toggleConfirmPassModal}
                onChange={toggleChangePassModal}
            />
            {showConfirmPass && (
                /*@ts-ignore*/
                <Modal
                    isOpen={showConfirmPass}
                    onClose={toggleConfirmPassModal}>
                    <Container className='small-centered'>
                        <EnterPasswordForm onValidPassword={handleConfirmDeletePassword} />
                    </Container>
                </Modal>
            )}
            {showCreatePass && (
                /*@ts-ignore*/
                <Modal
                    isOpen={showCreatePass}
                    onClose={toggleCreatePassModal}>
                    <Container className='small-centered'>
                        <CreatePasswordTitle>
                            {t('setupPasswordProtection.pageTitle')}
                        </CreatePasswordTitle>
                        <CreatePasswordDescription>
                            {t('setupPasswordProtection.pageText')}
                        </CreatePasswordDescription>
                        <PasswordForm>
                            <SetPassword
                                disabled={false}
                                onChange={setPassword} />
                        </PasswordForm>
                        <Controls>
                            <FormButton
                                /*@ts-ignore*/
                                color='light-gray-blue'
                                onClick={toggleCreatePassModal}>
                                {t('button.cancel')}
                            </FormButton>
                            <FormButton
                                /*@ts-ignore*/
                                disabled={password === null}
                                onClick={handleCreateSubmit}>
                                {t('setupPasswordProtection.create')}
                            </FormButton>
                        </Controls>
                    </Container>
                </Modal>
            )}

            {showChangePass && (
                <h3>Change pass component</h3>
            )}
        </>
    );
};

export default PasswordProtection;