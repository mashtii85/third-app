// Style
import styled from 'styled-components'

// UI
import { Image } from '@drykiss/industry-ui'

// Types
import { CompletionCertificateStyledComponent } from './types.d'

export const CompletionCertificate = (input: CompletionCertificateStyledComponent) => {
  return (
    <StyledContainer>
      <div className="completionCertificate">
        <div className="info">
          <Image className="logo" alt="uae fa logo" src="/logo.png" />
          <p className="title">UAE FA</p>
          <p className="username">{input.username}</p>
          <p className="course">
            Is hereby awarded this certificate of achievement for the successful completion of
            <strong> {input.course} </strong>course on<strong> {input.dateCompleted} </strong>
          </p>
        </div>
        <div className="footer">
          <p className="certificate-id">{`Certificate ID: ${input.certificateId}`}</p>
        </div>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  background-image: url('/certificate-background.jpg');
  .completionCertificate {
    border: 3px solid #0084ff;
    border-radius: 5px;
  }
  .info {
    height: 600px;
    text-align: center;
    margin: auto;
  }
  .logo {
    margin: 100px 0 0;
  }
  .title {
    margin: 10px 0 0;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .username {
    margin: 70px 0 0;
    font-size: 48px;
    color: #0084ff;
  }
  .course {
    margin: 40px 10px 0;
    font-size: 16px;
    color: #1f1f1f;
  }
  .userinfo {
    font-size: 16px;
    color: darkgrey;
  }
  .footer {
  }
  .certificate-id {
    margin: 0 10px 10px;
    font-size: 12px;
    color: darkgrey;
  }
`
