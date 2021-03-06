// == Import locaux
import styled from 'styled-components';

const Counterstyled = styled.div`
  text-align: center;

  .icon-top {
    color: #B8B8B8;

    &:hover {
      transform: translateY(-5px);
      color: green;
    }
  }

  .icon-top-voted {
    color: green;
    transform: translateY(-5px);
  }

  .value-score {
    font-size: 1.2rem;
    padding-right:3px;
    color: #E76F51;
  }

  .icon-bottom {
    color: #B8B8B8;

    &:hover {
      transform: translateY(5px);
      color: red;
    }
  }

  .icon-bottom-voted {
    color: red;
    transform: translateY(5px);
  }
`;

// == Export
export default Counterstyled;
