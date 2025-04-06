import Section from "@com/sections/Section"
import { InputFieldGroup } from "@com/sections/IconNameSection/InputFieldGroup"
import { useIconStore } from "@store/iconStore"
import CopyButton from "@com/CopyButton/CopyButton"
import { IconAlertTriangleSolid } from "@com/icons"

export const IconInfoSection = () => {
  const selectedIcons = useIconStore((st) => st.selectedIcons)
  const iconName = Array.from(selectedIcons)[0]
  const icon = useIconStore((state) => state.getIcon(iconName))

  if (selectedIcons.size !== 1 || !icon) {
    return null
  }

  const iconComponent = `<${icon.component} />`

  return (
    <Section>
      <div>
        <InputFieldGroup
          label={"Icon Name"}
          value={iconName}
          inputProps={{
            type: "text",
            readOnly: true,
            onClick: (e) => {
              e.stopPropagation()
              // select the text
              const target = e.target as HTMLInputElement
              target.select()
            },
          }}
          suffix={<CopyButton value={iconName} />}
        />
      </div>
      <div>
        <InputFieldGroup
          label={"Component"}
          value={iconComponent}
          inputProps={{
            type: "text",
            readOnly: true,
            onClick: (e) => {
              e.stopPropagation()
              // select the text
              const target = e.target as HTMLInputElement
              target.select()
            },
          }}
          suffix={<CopyButton value={iconComponent} />}
        />
      </div>
      {!icon.generated && (
        <div className="flex items-center gap-10 rounded-md border-1 border-yellow-200 bg-yellow-100 p-10 text-xs text-yellow-700">
          <div className={"text-yellow-500"}>
            <IconAlertTriangleSolid size={16} />
          </div>
          <div>
            The component for the selected icon is not created yet. <b>Generate</b> button will do
            the job.
          </div>
        </div>
      )}
    </Section>
  )
}
