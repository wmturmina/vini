import styled from 'styled-components';

import { COLORS } from '../../assets/theme';

export const Container = styled.div`
  display: flex;
`;

export const Left = styled.div`
  width: 40%;
  background: ${COLORS.PRIMARY};
  height: 100vh;
  position: fixed;
`;

export const LeftContainer = styled.aside`
  margin: 30px 70px;
  margin-top: 50%;
  height: calc(100% - 60px);

  .text {
    height: 50%;
    display: flex;
    align-items: center;
    color: ${COLORS.WHITE};

    .title {
      font-weight: 300;
      font-style: normal;
      font-size: 26px;
    }
  }
`;

export const Top = styled.div`
  position: fixed;
  left: 40%;
  width: 60%;
  align-items: center;
  .back {
    margin: 30px 30px;
    width: 100%;
  }
`;
export const Right = styled.div`
  position: fixed;
  left: 40%;
  width: 60%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .box {
    display: flex;
    flex-direction: column;
    width: 50%;

    .login {
      color: ${COLORS.PRIMARY};
      font-weight: 700;
      font-size: 26px;
      margin: 10px 0;
    }

    .subtitle {
      color: ${COLORS.GREY};
      font-weight: 400;
      font-size: 20px;
      margin: 10px 0;
    }

    .input {
      margin: 10px 0;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .forgot-pass {
    font-weight: 400;
    color: ${COLORS.PRIMARY};
  }
`;

export const Error = styled.span`
  text-align: center;
  margin: 0.5rem;
  color: ${COLORS.ERROR};
`;
