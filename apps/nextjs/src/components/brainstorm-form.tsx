"use client";

import { useCompletion } from "ai/react";
import { Button } from "@saasfly/ui/button";
import { Textarea } from "@saasfly/ui/textarea";

export default function BrainstormForm() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
  } = useCompletion({
    api: "/api/ai/brainstorm",
  });

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          value={input}
          placeholder="Enter your prompt..."
          onChange={handleInputChange}
        />

        <Button disabled={isLoading} type="submit">
          Generate
        </Button>
      </form>

      {error && (
        <div className=" p-4 mt-4 text-red-500 border border-red-500 rounded-lg">
          <p>Something went wrong!</p>
        </div>
      )}

      {completion && (
        <div className=" p-4 mt-4 border rounded-lg whitespace-pre-wrap">
          <p>{completion}</p>
        </div>
      )}
    </div>
  );
}
