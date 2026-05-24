import type { FormEvent } from "react";

import { Button } from "../../components/Button";
import { Field, FieldDescription, FieldLabel } from "../../components/Field";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import styles from "./CandidateForm.module.css";

export type CandidateFormValues = {
  address: string;
  latitude: string;
  longitude: string;
  listingPriceYen: string;
  landAreaSquareMeters: string;
  listingUrl: string;
  note: string;
};

const initialValues: CandidateFormValues = {
  address: "",
  latitude: "",
  longitude: "",
  listingPriceYen: "",
  landAreaSquareMeters: "",
  listingUrl: "",
  note: "",
};

type CandidateFormProps = {
  onSubmit: (values: CandidateFormValues) => void;
};

export function CandidateForm({ onSubmit }: CandidateFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit({
      address: getFormValue(formData, "address"),
      latitude: getFormValue(formData, "latitude"),
      longitude: getFormValue(formData, "longitude"),
      listingPriceYen: getFormValue(formData, "listingPriceYen"),
      landAreaSquareMeters: getFormValue(formData, "landAreaSquareMeters"),
      listingUrl: getFormValue(formData, "listingUrl"),
      note: getFormValue(formData, "note"),
    });
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field name="address">
        <FieldLabel>住所</FieldLabel>
        <Input
          autoComplete="street-address"
          defaultValue={initialValues.address}
          name="address"
          placeholder="東京都..."
        />
        <FieldDescription>
          住所はメモとして保存します。座標確定は緯度経度を使います。
        </FieldDescription>
      </Field>

      <div className={styles["coordinate-grid"]}>
        <Field name="latitude">
          <FieldLabel>緯度</FieldLabel>
          <Input
            defaultValue={initialValues.latitude}
            inputMode="decimal"
            name="latitude"
            placeholder="35.000000"
          />
        </Field>

        <Field name="longitude">
          <FieldLabel>経度</FieldLabel>
          <Input
            defaultValue={initialValues.longitude}
            inputMode="decimal"
            name="longitude"
            placeholder="139.000000"
          />
        </Field>
      </div>

      <div className={styles["coordinate-grid"]}>
        <Field name="listingPriceYen">
          <FieldLabel>販売価格</FieldLabel>
          <Input
            defaultValue={initialValues.listingPriceYen}
            inputMode="numeric"
            name="listingPriceYen"
            placeholder="49800000"
          />
        </Field>

        <Field name="landAreaSquareMeters">
          <FieldLabel>土地面積</FieldLabel>
          <Input
            defaultValue={initialValues.landAreaSquareMeters}
            inputMode="decimal"
            name="landAreaSquareMeters"
            placeholder="120.5"
          />
        </Field>
      </div>

      <Field name="listingUrl">
        <FieldLabel>物件 URL</FieldLabel>
        <Input
          defaultValue={initialValues.listingUrl}
          name="listingUrl"
          placeholder="https://..."
          type="url"
        />
      </Field>

      <Field name="note">
        <FieldLabel>メモ</FieldLabel>
        <Textarea
          defaultValue={initialValues.note}
          name="note"
          placeholder="仲介会社への確認事項、現地で見たいことなど"
        />
      </Field>

      <div className={styles.actions}>
        <Button type="submit">候補地を反映</Button>
      </div>
    </form>
  );
}

function getFormValue(formData: FormData, name: keyof CandidateFormValues) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}
