"use client"

import { ZodSchema } from "zod";
import {useTransition} from "react";
import {useForm, UseFormProps} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

type ActionResult = {
    error?: string;
    fieldErrors?: Record<string, string[]>;
    ok?: boolean;
};

interface UseServerFormOptions<TForm, TPayload> {
    schema: ZodSchema<TForm>;
    defaultValues: UseFormProps<TForm>["defaultValues"];
    action: (payload: TPayload) => Promise<ActionResult>;
    mapData?: (data: TForm) => TPayload;
    onSuccess?: () => void;
}

export function useServerForm<TForm, TPayload = TForm>({ schema, defaultValues, action, mapData, onSuccess }: UseServerFormOptions<TForm, TPayload>) {
    const [ isPending, startTransition ] = useTransition();

    const form = useForm<TForm>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const onSubmit = (data: TForm) => {
        const payload = mapData ? mapData(data) : (data as unknown as TPayload);

        startTransition(async () => {
            const result = await action(payload);

            if (result?.fieldErrors) {
                Object.entries(result.fieldErrors).forEach(([field, messages]) => {
                    form.setError(field as any, {
                       message: messages?.[0],
                    });
                });

            }
            if (result?.error) {
                form.setError("root", { message: result.error });
            }

            if (result?.ok) {
                onSuccess?.();
            }
        });
    };

    return { form, isPending, onSubmit: form.handleSubmit(onSubmit) };
}