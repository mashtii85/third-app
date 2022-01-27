import { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { SettingProps, SettingType, SpeedOption, SpeedSetting } from '@availabletowork/types'
import { ArrowLeftIcon } from './arrowLeftIcon'
import { ArrowRightIcon } from './arrowRightIcon'
import { CheckedCircleIcon } from './checkedCircleIcon'
import { SettingIcon } from './icon'

export const Setting = ({ selectedSpeed, onSpeedChange }: SettingProps) => {
  const settings = useRef<SettingType[]>([
    {
      type: 'speed',
      title: 'Speed',
      options: [
        { optionName: 'Very Fast (3x)', optionValue: 3, selected: false },
        { optionName: 'Fast (2x)', optionValue: 2, selected: false },
        { optionName: 'Normal (1x)', optionValue: 1, selected: false },
        { optionName: 'Slow (0.5x)', optionValue: 0.5, selected: false }
      ]
    }
  ])

  const [visible, setVisible] = useState(false)

  const [selectedSetting, setSelectedSetting] = useState<SpeedSetting | null>(null)

  const handleSettingClick = () => {
    setVisible(!visible)
  }

  let speed: SpeedOption = { optionName: 'Normal (1x)', optionValue: 1, selected: true }

  settings.current.forEach((item) => {
    item.options.forEach((speedOption) => {
      if (speedOption.optionValue === selectedSpeed) {
        speedOption.selected = true
        speed = speedOption
      } else {
        speedOption.selected = false
      }
    })
  })

  const handleMainSettingClick = (index: number) => {
    setSelectedSetting(settings.current[index])
  }
  const handleBackClick = () => {
    setSelectedSetting(null)
  }

  const handleSubSettingClick = (type: string, index: number) => {
    if (selectedSetting != null) {
      switch (type) {
        case 'speed':
          {
            const selectedSpeed = selectedSetting.options[index]
            onSpeedChange(selectedSpeed)
          }

          break

        default:
          break
      }
    }
    setVisible(false)
  }

  return (
    <SettingWrapper>
      <Settings visible={visible}>
        <MainSettingsWrapper visible={selectedSetting === null}>
          <MainSettingsTitle>Settings</MainSettingsTitle>
          {settings.current.map((item, index) => {
            return (
              <OptionWrapper
                key={index}
                withBorderBottom={index !== settings.current.length - 1}
                onClick={() => handleMainSettingClick(index)}
              >
                {item.type === 'speed' && (
                  <>
                    <OptionSpan>{item.title}</OptionSpan>
                    <OptionSpan>
                      <OptionText>{speed.optionName}</OptionText> <ArrowRightIcon />
                    </OptionSpan>
                  </>
                )}
              </OptionWrapper>
            )
          })}
        </MainSettingsWrapper>

        {selectedSetting != null && (
          <MainSettingsWrapper visible={selectedSetting !== null}>
            <MainSettingsTitle>
              <BackWrapper onClick={handleBackClick}>
                <ArrowLeftIcon />
              </BackWrapper>
              {selectedSetting.title}
            </MainSettingsTitle>
            {selectedSetting.options.map((item, index) => {
              return (
                <OptionWrapper
                  key={index}
                  withBorderBottom={index !== selectedSetting.options.length - 1}
                  onClick={() => handleSubSettingClick(selectedSetting.type, index)}
                >
                  <OptionSpan>{item.optionName}</OptionSpan>
                  <OptionSpan>{item.selected && <CheckedCircleIcon />}</OptionSpan>
                </OptionWrapper>
              )
            })}
          </MainSettingsWrapper>
        )}
      </Settings>
      <IconWrapper onClick={handleSettingClick}>
        <SettingIcon />
      </IconWrapper>
    </SettingWrapper>
  )
}
const BackWrapper = styled.div`
  margin-right: 0.5rem;
  cursor: pointer;
`
const OptionWrapper = styled.div<{ withBorderBottom: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  ${({ withBorderBottom }) =>
    withBorderBottom &&
    css`
      border-bottom: 1px solid white;
    `}
`
const OptionSpan = styled.span`
  display: flex;
  align-items: center;
`
const OptionText = styled.span``

const MainSettingsWrapper = styled.div<{ visible: boolean }>`
  display: none;
  width: 100%;
  ${({ visible }) =>
    visible &&
    css`
      display: block;
    `}
`
const MainSettingsTitle = styled.div`
  margin: 0;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
`

const Settings = styled.div<{ visible: boolean }>`
  position: absolute;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: rgba(102, 102, 102, 0.5);
  color: white;
  width: 220px;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(10px);
  bottom: 50px;
  right: -50px;
  display: flex;

  pointer-events: none;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      transform: translateY(0px);
      pointer-events: all;
    `}
`
const IconWrapper = styled.div`
  cursor: pointer;
`

const SettingWrapper = styled.div`
  position: relative;
`
