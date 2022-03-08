import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CustomCheckBox } from './components/atoms/CustomCheckBox';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid } from '@material-ui/core';
import { Controller, FieldValues, useForm } from 'react-hook-form';


function App() {

  const [submitData, setSubmitData] = useState<string>("");
  const [checkbox1Req, setCheckbox1Req] = useState<boolean>(true);
  const [checkbox2Req, setCheckbox2Req] = useState<boolean>(true);
  const [checkbox1List, setCheckbox1List] = useState<Array<string>>([]);
  const [checkbox2List, setCheckbox2List] = useState<Array<string>>([]);
  const defaultCheckedValues = [""];

  // Options1
  const options1 = [
    {
      title: "A"
    },
    {
      title: "B"
    },
    {
      title: "C"
    },
    {
      title: "D"
    }
  ];
    // Options2
    const options2 = [
      {
        title: "W"
      },
      {
        title: "X"
      },
      {
        title: "Y"
      },
      {
        title: "G"
      }
    ];
  const {
    formState: { errors },
    control,
    setValue,
    getValues,
    setError,
    handleSubmit
  } = useForm<FieldValues>({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: { checkbox: defaultCheckedValues.join(",") }
  });

  const handleFormOnSubmit = (data: any) => {
    setSubmitData(data.checkbox);
  };

  const handleCheck1 = (
    option: { title: string },
    event: React.ChangeEvent<{}>
  ) => {
    let values: string[] = getValues("checkbox1")?.split(",") || [];
    values = values.filter((v) => v); // 空要素削除

    let newValues: string[] = [];
    if ((event.target as HTMLInputElement).checked) {
      newValues = [...(values ?? []), option.title];
    } else {
      newValues = values?.filter((value) => value !== option.title);
    }
    setValue("checkbox1", newValues.join(","));
    setCheckbox1List(newValues);

    return newValues.join(",");
  };

  const handleCheck2 = (
    option: { title: string },
    event: React.ChangeEvent<{}>
  ) => {
    let values: string[] = getValues("checkbox2")?.split(",") || [];
    values = values.filter((v) => v); // 空要素削除

    let newValues: string[] = [];
    if ((event.target as HTMLInputElement).checked) {
      newValues = [...(values ?? []), option.title];
    } else {
      newValues = values?.filter((value) => value !== option.title);
    }
    setValue("checkbox2", newValues.join(","));
    setCheckbox2List(newValues);

    return newValues.join(",");
  };
  useEffect(() => {
    setCheckbox1Req(checkbox2List.length !== 0);
  },[checkbox2List]);

  useEffect(() => {
    setCheckbox2Req(checkbox1List.length !== 0);
  },[checkbox1List]);

  console.log(errors);

  return (
    <>
    <Grid container alignItems="center" justify="center">
      <form
        method="POST"
        onSubmit={handleSubmit(handleFormOnSubmit)}
        encType="multipart/form-data"
      >
        <FormControl
          required
          error={errors?.hasOwnProperty("checkbox1")}
          component="fieldset"
          fullWidth
        >
          <FormLabel component="legend">質問1</FormLabel>

          <FormHelperText>
            {errors?.checkbox1 && errors?.checkbox1.message}
          </FormHelperText>

          <FormGroup>
            <Controller
              name="checkbox1"
              control={control}
              rules={{ required: checkbox1Req && "チェックを入れてください" }}
              defaultValue=""
              render={({ field, fieldState }) => (
                <>
                  {options1.map((option, i) => (
                    <FormControlLabel
                      {...field}
                      key={i}
                      label={option.title}
                      onChange={(event) =>
                        field.onChange(handleCheck1(option, event))
                      }
                      control={
                        <Checkbox
                          defaultChecked={defaultCheckedValues.includes(option.title)}
                        />
                      }
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
          </FormControl>
          <br />
          <FormControl
          required
          error={errors?.hasOwnProperty("checkbox2")}
          component="fieldset"
          fullWidth
        >

          <FormLabel component="legend">質問2</FormLabel>

          <FormHelperText>
            {errors?.checkbox2 && errors?.checkbox2.message}
          </FormHelperText>

          <FormGroup>
            <Controller
              name="checkbox2"
              control={control}
              rules={{ required: checkbox2Req && "チェックを入れてください" }}
              defaultValue=""
              render={({ field, fieldState }) => (
                <>
                  {options2.map((option, i) => (
                    <FormControlLabel
                      {...field}
                      key={i}
                      label={option.title}
                      onChange={(event) =>
                        field.onChange(handleCheck2(option, event))
                      }
                      control={
                        <Checkbox
                          defaultChecked={defaultCheckedValues.includes(option.title)}
                        />
                      }
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          送信
        </Button>
      </form>
      <br />
      送信内容
      <br />
      {submitData}
      </Grid>
    </>
  );
}

export default App;
