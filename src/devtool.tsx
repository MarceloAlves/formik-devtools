import React from 'react'
import { useFormikContext } from 'formik'
import { get } from 'lodash'
import styled from '@emotion/styled'
import FormikIcon from './assets/FormikIcon'
import CheckSolid from './assets/CheckSolid'
import TimesSolid from './assets/TimesSolid'

const DrawerIcon = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 50%;
  right: 0;
  cursor: pointer;
  padding: 10px;
  /* background-color: #172b4d; */
  background-color: #172b4d;
  z-index: 9999;
  height: 50px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  svg {
    width: 20px;
    height: 20px;

    path {
      fill: white;
    }
  }
`

const Drawer = styled.div`
  position: fixed;
  height: 100vh;
  width: 250px;
  z-index: 99999;
  background-color: #172b4d;
  color: #fff;
  top: 0;
  right: 0;
  display: grid;
  text-align: left;
  font-size: 15px;
  grid-template-rows: 30px 1fr auto;
  border-left: 1px solid #d6d6d6;
  box-shadow: rgba(0, 0, 0, 0.2) 4px 0px 20px 0px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 5px 5px 15px;
  border-bottom: 1px solid #d6d6d6;

  span {
    cursor: pointer;
  }
`

const StatusText = styled.div`
  cursor: pointer;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #d6d6d6;
`

const StatusContainer = styled.div`
  display: grid;
  grid-template-rows: '1fr 30px';
`

const StatusValues = styled.div<{ isVisible: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  overflow-y: hidden;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  max-height: ${props => (props.isVisible ? '100px' : 0)};
  padding-bottom: ${props => (props.isVisible ? '15px' : 0)};
  padding-left: 15px;
`

const CheckSolidIcon = styled(CheckSolid)`
  color: #77dd77;
  height: 15px;
`

const TimesSolidIcon = styled(TimesSolid)`
  color: #ff0052;
  height: 15px;
`

const FormikDevTool = () => {
  const { values, errors, touched, dirty, isSubmitting, isValid, isValidating, submitCount } = useFormikContext<any>()

  const [statusPanel, setStatusPanel] = React.useState<'open' | 'closed'>('open')
  const [drawerState, setDrawerState] = React.useState<'open' | 'closed'>('open')

  if (drawerState === 'closed') {
    return (
      <DrawerIcon onClick={() => setDrawerState('open')}>
        <FormikIcon />
      </DrawerIcon>
    )
  }

  return (
    <Drawer>
      <Title>
        Formik DevTools <span onClick={() => setDrawerState('closed')}>[X]</span>
      </Title>
      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {Object.entries(values).map(([key, value], index) => {
          return (
            <div key={index} style={{ padding: '15px', borderBottom: '1px solid #d6d6d6' }}>
              Field: {key}
              <br />
              Value: {value}
              <br />
              Errors: {!get(errors, key, false) ? <TimesSolidIcon /> : <CheckSolidIcon />}
              <br />
              Touched: {get(touched, key, false) ? <CheckSolidIcon /> : <TimesSolidIcon />}
            </div>
          )
        })}
      </div>
      <StatusContainer>
        <StatusValues isVisible={statusPanel === 'open'}>
          <span>Dirty: {dirty ? <CheckSolidIcon /> : <TimesSolidIcon />}</span>
          <span>Submitting: {isSubmitting ? <CheckSolidIcon /> : <TimesSolidIcon />}</span>
          <span>Valid: {isValid ? <CheckSolidIcon /> : <TimesSolidIcon />}</span>
          <span>Validating: {isValidating ? <CheckSolidIcon /> : <TimesSolidIcon />}</span>
          <span>Submit Count: {submitCount}</span>
        </StatusValues>
        <StatusText onClick={() => setStatusPanel(value => (value === 'open' ? 'closed' : 'open'))}>Status</StatusText>
      </StatusContainer>
    </Drawer>
  )
}

export { FormikDevTool }
