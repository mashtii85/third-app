/* eslint-disable max-len */
export const CheckBox = ({ checked }: { checked: boolean }) => {
  return checked ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#45BABE" stroke="#45BABE" />
      <path
        d="M8.5568 13.3625L5.6318 10.3117C5.45607 10.1285 5.45607 9.83128 5.6318 9.64798L6.26818 8.98422C6.44391 8.80091 6.72885 8.80091 6.90458 8.98422L8.875 11.0393L13.0954 6.63746C13.2712 6.45418 13.5561 6.45418 13.7318 6.63746L14.3682 7.30123C14.5439 7.48451 14.5439 7.78169 14.3682 7.96499L9.1932 13.3625C9.01745 13.5458 8.73253 13.5458 8.5568 13.3625Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#D9D9D9" />
    </svg>
  )
}
