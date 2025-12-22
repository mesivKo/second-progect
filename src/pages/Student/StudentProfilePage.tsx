import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { SocialIcon } from "../../icons/icons";
import { Modal } from "../../components/Modal";
import ChangeModalPass from "../../components/ChangeModalPass";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 346px 1fr;
    gap: 30px;
`;

const AvatarBox = styled.img`
    width: 100%;
    border-radius: 20px;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const LinkRow = styled.a`
    display: flex;
    align-items: center;
    color: #09090b;
    gap: 10px;
    margin-bottom: 15px;
`;

const FullName = styled.h2`
    color: #09090b;
    font-weight: 700;
    font-size: 30px;
    line-height: 1;
    margin-bottom: 20px;
`;

const GroupLearning = styled.ul`
    /* display: flow;
    align-items: center;
    gap: 10px; */
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ItemLabel = styled.span`
    display: flex;
    font-weight: 400;
    font-size: 18px;
    line-height: 1;
    color: #09090b;
    padding: 6px 13px;
    background-color: #f5f5f5;
    border-radius: 14px;
`;


type GroupLearning = {group: string; course: string; direction: string}

type ProfileData = {
    fullName: string;
    achivment: string;
    avatarUrl: string;
    social: {
        url: string;
        label: string;
    };
    learning: GroupLearning[];
};


export function StudentProfilePage() {
    const userData = {
        fullName: "Татарова Дарья Витальевна",
        achivment: "КОД",
        avatarUrl: "data:image/jpeg;base64,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",
        social: {
            url: "https://vk.com/dosh_o",
            label: 'dosh_o',
        },
        learning: [{group: "КФ3", course: "3 курс", direction: "Frontend"}]
    }
    const [profile, setProfile] = useState<ProfileData>(userData);
    const [isOpenModal, setIsOpenModal] = useState(false);

    function handleChangePass(){
        setIsOpenModal(true);
    }


    return (
        <Wrapper>
            {profile.avatarUrl ? (
                <AvatarBox src={profile.avatarUrl} alt={profile.fullName} />
            ) : (
                <AvatarBox
                    src="https://www.trzepizur.pl/media/k2/items/cache/e2acd849d365015ef08ef5b696dc9e31_XL.jpg"
                    alt={profile.fullName}
                />
            )}
            <InfoColumn>
                <FullName>{profile.fullName}</FullName>
                <div>{profile.achivment}</div>
                <LinkRow href={profile.social.url}>
                    <SocialIcon />
                    {profile.social?.label}
                </LinkRow>
                <GroupLearning>
                    {profile.learning.map((s, ind) => (
                        <Item key={ind}>
                            <ItemLabel>{s.course}</ItemLabel>
                            <ItemLabel>{s.direction}</ItemLabel>
                            <ItemLabel>{s.group}</ItemLabel>
                        </Item>
                    ))}
                </GroupLearning>
                <div>
                    <button>Поменять фото</button>
                    <button onClick={ () => handleChangePass()}>Изменить пароль</button>
                </div>
            </InfoColumn>
            <ChangeModalPass
                open={isOpenModal}
                onClose={v => setIsOpenModal(v)}
            />
        </Wrapper>
    )
}