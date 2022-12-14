import styled from 'styled-components';

//rang

export const UserRangCard = styled.div`
  padding: 24px;
  width: 124px;
  min-height: 289px;
  background: #ffffff;
  border-radius: 14px;
  flex: 1 0 124px;
`;

export const RangTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 34px;
`;

export const RangTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #0a2896;
`;

export const RangRole = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #5865f2;
  margin-bottom: 45px;
`;

export const RangLevelCercleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 12px;
`;
export const RangLevelCercle = styled.img``;

export const RangLevelCercleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;

export const RangExperience = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #0a2896;
`;

export const RangExpretienceTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #0a2896;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 289px;
  margin-bottom: 48px;
`;

export const UserCard = styled.div`
  min-height: 289px;
  background-color: ${(props) => props.theme.colors.white};
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  position: relative;
`;

export const UserImageContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 24px;
  height: 96px;
  alignt-items: center;
`;

export const UserImage = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.background};
`;

export const UserName = styled.div`
  position: relative;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #23272a;
  margin: 8px 0;

  &::after {
    content: '${(props) => props.rank}';
    position: absolute;
    top: 50%;
    right: calc(-12px);
    transform: translate(100%, -50%);

    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #5865f2;
  }
`;

export const UserLevel = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #5865f2;
`;

export const UserPosition = styled.p`
  margin: 8px 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #23272a;
`;

export const UserCity = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #23272a;
`;

export const UserBioTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #b6c1dd;
  margin-bottom: 12px;
`;

export const UserBio = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #23272a;
  margin-bottom: 24px;
`;

export const UserRole = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 12px 16px;

  border: 1px solid #b6c1dd;
  border-radius: 8px;

  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #23272a;
`;

//balance
export const UserBalance = styled.div`
  flex: 1 0 155px;
  width: 155px;
  height: 289px;
  background-color: ${(props) => props.theme.colors.white};
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;

  display: flex;
  flex-direction: column;
`;

export const BalanceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #23272a;

  margin-bottom: 24px;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
  color: #5865f2;

  margin-bottom: 40px;
`;
