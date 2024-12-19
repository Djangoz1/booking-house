"use client";
import { BoxIcon } from "@/components/box/BoxIcon";
import { Input } from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { FontTitle2 } from "@/components/text/FontTitle";
import { icfy } from "@/constants/icon";
import { useApp } from "@/context/app";

import { useRoomById } from "@/hooks/useRoomById";
import { Room } from "@/types";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const page = () => {
  const {
    data: { rooms },
  } = useApp();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id") || 1);
  const { data: room } = useRoomById(id);
  const client = useQueryClient();
  console.log({ rooms, room });
  if (!room) return null;
  const updateRoom = async (key: keyof Room, value: string | number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [key]: value }),
      }
    );

    client.invalidateQueries({ queryKey: [`rooms/${id}`, { id: room.id }] });
  };

  return (
    <div className="flex flex-col h-screen bg-light">
      <div className="flex w-full h-[50vh] flex-col items-center justify-end  relative overflow-y-hidden border-sec border-b-2 shadow-sec shadow rounded-b-xl">
        <img
          src={room.image}
          alt={room.name}
          className="w-full absolute h-[50vh] left-0 top-0 -translate-y-1/2 object-cover brightness-50"
        />
        <FontTitle2 className="relative mb-10 text-light text-4xl">
          {room.name}
        </FontTitle2>
      </div>
      <div className="flex w-full justify-center border-b-2 border-sec">
        {(rooms || []).map((_room, i) => (
          <Link
            key={`room-${i}`}
            href={`/admin?id=${_room.id}`}
            className={cn(
              "px-10 py-5  border-2 border-t-0",
              _room.id !== id
                ? "border-sec opacity-50 hover:opacity-100 "
                : "bg-sec border-black/5"
            )}
          >
            <FontTitle2
              className={cn(
                "text-2xl",
                _room.id !== id ? "text-sec1" : "text-light"
              )}
            >
              {_room.name}
            </FontTitle2>
          </Link>
        ))}
      </div>
      <div className="flex flex-col p-40 gap-10 overflow-y-scroll">
        <Link
          href="/admin/dashboard"
          className="hover:underline text-2xl font-light"
        >
          Voir réservations
        </Link>
        <div className="flex flex-col gap-40 ">
          {[
            {
              icon: icfy.person.edit,
              title: "Nom",
              desc: `Modifier le nom pour ${room.name}`,

              children: (
                <Input
                  onBlur={async (e) => {
                    if (e.target.value && e.target.value !== room.name) {
                      await updateRoom("name", e.target.value);
                    }
                  }}
                  key={`input-name-${room.id}`}
                  placeholder="Nom de la commodité"
                  defaultValue={`${room.name}`}
                  id={`name-${room.id}`}
                />
              ),
            },
            {
              icon: icfy.person.friend,
              title: "Capacité",
              desc: `Modifier la capacité max pour ${room.name}`,

              children: (
                <Input
                  onBlur={async (e) => {
                    if (
                      e.target.value &&
                      Number(e.target.value) !== room.capacity
                    ) {
                      await updateRoom("capacity", Number(e.target.value));
                    }
                  }}
                  key={`input-capacity-${room.id}`}
                  placeholder="Capacité max"
                  type="number"
                  defaultValue={`${room.capacity}`}
                  id={`capacity-${room.id}`}
                />
              ),
            },
            {
              icon: icfy.bank.dollars,
              title: "Prix",
              desc: `Modifier le prix par défaut pour ${room.name}`,

              children: (
                <Input
                  onBlur={async (e) => {
                    if (
                      e.target.value &&
                      Number(e.target.value) !== room.default_price
                    ) {
                      await updateRoom("default_price", Number(e.target.value));
                    }
                  }}
                  type="number"
                  key={`input-price-${room.id}`}
                  placeholder="Prix en €"
                  defaultValue={`${room.default_price}`}
                  id={`price-${room.id}`}
                />
              ),
            },
            {
              icon: icfy.person.edit,
              title: "Description",
              desc: `Renseigner la description pour ${room.name}`,

              children: (
                <Textarea
                  onBlur={async (e) => {
                    if (e.target.value && e.target.value !== room.description) {
                      await updateRoom("description", e.target.value);
                    }
                  }}
                  key={`input-description-${room.id}`}
                  placeholder="Description"
                  defaultValue={`${room.description}`}
                  id={`description-${room.id}`}
                />
              ),
            },
            {
              icon: icfy.eye.open,
              title: "Photo",
              desc: `Gallerie de photos pour ${room.name}`,

              children: (
                <div className="grid grid-cols-3 gap-5 w-full">
                  <div className=" flex w-[200px] border-2 text-center border-dashed shadow  h-[200px] flex-col rounded-md border-sec bg-light items-center justify-center gap-5 relative hover:bg-sec/10">
                    <Icon icon="mdi:plus" className="text-2xl" />
                    <FontTitle2 className="text-sec text-sm">
                      Upload image(s)
                    </FontTitle2>
                    <input
                      type="file"
                      className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
                      multiple
                      onChange={async (e) => {
                        console.log(e.target.files);
                        if (!e.target?.files) return;
                        const files = Array.from(e.target.files);
                        for (const file of files) {
                          const formData = new FormData();
                          formData.append("room_id", id.toString());
                          formData.append("file", file);
                          const res = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                            {
                              method: "POST",
                              body: formData,
                            }
                          );
                          client.invalidateQueries({
                            queryKey: [`rooms/${id}`, { id: room.id }],
                          });
                          console.log({ res, test: await res.json() });
                        }
                      }}
                    />
                  </div>

                  {room.gallery.map((el, i) => (
                    <div
                      key={`room-image-${i}`}
                      className="flex w-[200px] border-2 text-center shadow  h-[200px] flex-col rounded-md border-sec bg-light items-end gap-5 relative overflow-hidden"
                    >
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={el.image}
                        alt={`${room.name} photo ${i}`}
                      />
                      <div className="flex gap-2 brightness-50 hover:brightness-100 m-2 relative">
                        <button
                          disabled={room.image === el.image}
                          onClick={async () => {
                            await updateRoom("image", el.image);
                          }}
                          className={cn(
                            "text-sec bg-light shadow border rounded-xl p-2 flex items-center justify-center hover:bg-sec hover:text-light",
                            room.image === el.image && "bg-sec text-light"
                          )}
                        >
                          <Icon icon={icfy.ux.star} className="text-2xl" />
                        </button>
                        <button
                          onClick={async () => {
                            const res = await fetch(
                              `${process.env.NEXT_PUBLIC_API_URL}/upload/${el.id}`,
                              {
                                method: "DELETE",
                              }
                            );
                            client.invalidateQueries({
                              queryKey: [`rooms/${id}`, { id: room.id }],
                            });
                          }}
                          className="text-red-500 bg-light shadow border rounded-xl p-2 flex items-center justify-center"
                        >
                          <Icon icon={"mdi:delete"} className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
          ].map((item, i) => (
            <div key={`item-${i}`} className="flex gap-10">
              <BoxIcon icon={item.icon} />
              <div className="flex flex-col gap-1 w-1/3">
                <FontTitle2>{item.title}</FontTitle2>
                <p className="text-opacity-70 font-light">{item.desc}</p>
              </div>
              {item.children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
